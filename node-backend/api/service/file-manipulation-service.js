/**
 * Description: This class is used for file manipulation
 */
const filePath = 'D:/npmrc';
const lineReader = require('line-reader');
const promise = require('promise');
const fs = require('fs');
const os = require("os");

class FileManipulation {

    constructor() {
        console.log('FileManipulation');
        this.x;
    }
    static makeObject() {
        if (!this.x) {
            this.x = new FileManipulation();
        }
        return this.x;
    }

    /**
     * This function is used for reading file and returning response
     */
    fileRead() {
        try {
            let o = {};
            let key = 'NPMRCData';
            o[key] = [];
            return new Promise((resolve, reject) => {
                console.log('promise data=============');
                lineReader.eachLine(filePath, function (line) {
                    let lineData = line;
                    let stringData = lineData.split('=');
                    let data = {
                        key: stringData[0],
                        value: stringData[1]
                    };
                    o[key].push(data);
                });
                setTimeout(() => {
                    resolve(o);
                }, 10);
            });
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * This function is used for writing file and returning response
     */
    fileWrite(req) {
        try {
            let fileContent = req.params.key + '=' + req.params.value;
            return new Promise((resolve, reject) => {
                fs.open(filePath, 'a', 666, function (e, id) {
                    fs.write(id, fileContent + os.EOL, null, 'utf8', function () {
                        fs.close(id, function () {
                            resolve('Writing Completed');
                        });
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * This function is used for editing value for key in file and returning response
     */
    fileValueEdit(req) {
        let replaceValue;
        try {
            return new Promise((resolve, reject) => {
                lineReader.eachLine(filePath, function (line) {
                    let lineData = line;
                    let stringData = lineData.split('=');
                    if (stringData[0].toString() === req.params.key.toString()) {
                        replaceValue = stringData[1].toString();
                    }
                });
                setTimeout(function () {
                    console.log('replace value ' + replaceValue);
                    fs.readFile(filePath, 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        var result = data.replace(replaceValue, req.params.value);
                        fs.writeFile(filePath, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                    });
                    resolve('Value Modified Sucessfully');
                }, 100)
            });
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * This function is used for editing key for value in file and returning response
     */
    fileKeyEdit(req) {
        let replaceValue;
        try {
            return new Promise((resolve, reject) => {
                lineReader.eachLine(filePath, function (line) {
                    let lineData = line;
                    let stringData = lineData.split('=');
                    if (stringData[1].toString() === req.params.value.toString()) {
                        replaceValue = stringData[0].toString();
                    }
                });
                setTimeout(function () {
                    console.log('replace value ' + replaceValue);
                    fs.readFile(filePath, 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        var result = data.replace(replaceValue, req.params.key);
                        fs.writeFile(filePath, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                    });
                    resolve('Key Modified Sucessfully');
                }, 100)
            });
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = FileManipulation;