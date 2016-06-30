sudo npm install -g ts-node
sudo npm install -g typescript
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get install -y mongodb-org=3.2.7 mongodb-org-server=3.2.7 mongodb-org-shell=3.2.7 mongodb-org-mongos=3.2.7 mongodb-org-tools=3.2.7
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
