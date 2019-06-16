import {
  cloudinaryUploadFinish,
  cloudinaryUploadProgress,
  cloudinaryUploadStart,
  uploadMedia,
} from '../actions/media';
import superagent from 'superagent';

function Uploader() {
  return {
    setDispatcher(dispatch) {
      this.dispatch = dispatch;
    },

    upload(file, callback, format = 'video', tags) {
      const { dispatch } = this;
      const videoUploadPreset = 'y0axelwn';
      const imageUploadPreset = 'bdxli8yf';
      const cloudName = 'YOUR CLOUDINARY CLOUD';
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/${format}/upload`;
      const request = superagent.post(url);
      const unsignedUploadPreset = format === 'video' ? videoUploadPreset : imageUploadPreset;
      request.field('upload_preset', unsignedUploadPreset);
      request.field('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      request.attach('file', file);

      dispatch(cloudinaryUploadStart());

      request.on('progress', (e) => {
        const { percent } = e;
        // update progress
        /* @e Object:
        {
          direction: "upload" or "download"
          percent: 0 to 100 // may be missing if file size is unknown
          total: // total file size, may be missing
          loaded: // bytes downloaded or uploaded so far
        } */
        dispatch(cloudinaryUploadProgress({
          progress: percent,
        }));
      }).then((result, e) => {
        // console.log('cloudinary result', result, e);

        dispatch(cloudinaryUploadFinish({
          data: result,
        }));

        // upload cloudinary id to our server to add it to the user's feed
        const payload = {
          format,
          xid: result.body.public_id,
        };
        if (tags) {
          payload.tags = tags;
        }
        dispatch(uploadMedia(payload)).then(() => {
          if (callback) {
            // console.log('callback');
            callback(result);
          }
        });

        // var response = JSON.parse(result.responseText);
        // // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        // var url = response.secure_url;
        // // Create a thumbnail of the uploaded image, with 150px width
        // var tokens = url.split('/');
        // tokens.splice(-2, 0, 'w_150,c_scale');

        // console.log('tokens', tokens, url);
        // var img = new Image(); // HTML5 Constructor
        // img.src = tokens.join('/');
        // img.alt = response.public_id;
        // document.getElementById('gallery').appendChild(img);
      }, (e) => {
        // console.log('cloudinary e', e);

        dispatch(cloudinaryUploadFinish({
          error: e,
        }));

        if (callback) {
          return callback(null, e);
        }
      });
    },
  };
}

const instance = new Uploader();

export default instance;
