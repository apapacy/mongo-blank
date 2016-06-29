sudo npm install -g ts-node
sudo npm install -g typescript
require('ts-node').register({
  //fast?: boolean
  //compiler?: string
  //noProject?: boolean
  //project?: string
  //ignoreWarnings?: Array<number | string>
  //disableWarnings: true
  //getFile?: (fileName: string) => string
  //getVersion?: (fileName: string) => string
  //getFileExists?: (fileName: string) => boolean
  compilerOptions: {
    'experimentalDecorators': true,
    'target': 'es6'
  }
});
