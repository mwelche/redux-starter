import IsoTools from 'webpack-isomorphic-tools';
import Plugin from 'webpack-isomorphic-tools/plugin';

const config = {
  assets: {
    images: {
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    },
  },
};

export const newTools = () => new IsoTools(config);
export const newPlugin = () => new Plugin(config);
