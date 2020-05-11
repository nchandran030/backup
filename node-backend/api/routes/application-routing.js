const express = require('express');
const app = express();
const fileManipulation = require('../service/file-manipulation-service').makeObject();
const hardwareDetails = require('../service/hardware-details-service').makeObject();
const folderDetails = require('../service/folder-tree-structure-service').makeObject();
const memoryDetails = require('../service/google-charts-service').makeObject();
const commands = require('../service/angular-terminal-service').makeObject();

class ApplicationRouting {

    constructor() {
        this.x;
    }

    static makeObject() {
        if (!this.x) {
            this.x = new ApplicationRouting();
        }
        return this.x;
    }

    readFileRoute(req, res, next) {
        console.log('Reading File Route');
        fileManipulation.fileRead().then((result) => {
            if (result) {
                res.status(200).json({
                    fileData: {
                        content: result
                    },
                });
            }
        });
    }

    writeFileRoute(req, res, next) {
        console.log('Writing File Route');
        fileManipulation.fileWrite(req).then((result) => {
            if (result) {
                res.status(200).json({
                    fileData: {
                        content: result
                    },
                });
            }
        });
    }

    keyEditFileRoute(req, res, next) {
        console.log('Editing File Route');
        fileManipulation.fileKeyEdit(req).then((result) => {
            if (result) {
                res.status(200).json({
                    fileData: {
                        content: result
                    },
                });
            }
        });
    }

    valueEditFileRoute(req, res, next) {
        console.log('Editing File Route');
        fileManipulation.fileValueEdit(req).then((result) => {
            if (result) {
                res.status(200).json({
                    fileData: {
                        content: result
                    },
                });
            }
        });
    }

    getHardwareDetails(req, res, next) {
        const data = hardwareDetails.getHardwareDetails();
        //logger.debug('ApplicationRouting|getHardwareDetails|data ',data);
        if (data) {
            data.then((result) => {
                if (result) {
                    res.status(200).json({
                        hardwareDetailsData: {
                            content: result
                        },
                    });
                }
            });
        } else {
            res.status(500).json({
                hardwareDetailsData: {
                    content: 'Error While Getting SystemHardware Details'
                },
            });
        }
    }

    /**
    * This  function is used to provide the final output i.e the system hardware details
    * return type is response with response code 200
    */
    getFileFolderDetailsDirectoryTree(req, res, next) {
        console.log('ApplicationRouting|getFolderDetails');
        const data = folderDetails.getFolderDetails();
        console.log('datas===================== ', data);
        if (data) {
            data.then((result) => {
                console.log('result===================== ', result);
                if (result) {
                    res.status(200).json({
                        folderDetailsData: {
                            content: result
                        },
                    });
                }
            });
        } else {
            res.status(500).json({
                folderDetailsData: {
                    content: 'Error While Getting FileFolderDetails Details'
                },
            });
        }
    }

    getMemoryDetails(req, res, next) {
        console.log('ApplicationRouting|getMemoryDetails');
        const data = memoryDetails.getMemoryDetails();
        console.log('datas===================== ', data);
        if (data) {
            data.then((result) => {
                console.log('result===================== ', result);
                if (result) {
                    res.status(200).json({
                        hardwareDetailsData: {
                            content: result
                        },
                    });
                }
            });
        } else {
            res.status(500).json({
                hardwareDetailsData: {
                    content: 'Error While Getting SystemHardware Details'
                },
            });
        }
    }

    getDiskWiseMemoryDetails(req, res, next) {
        console.log('ApplicationRouting|getDiskWiseMemoryDetails');
        const data = memoryDetails.getDiskWiseMemoryDetails();
        console.log('datas===================== ', data);
        if (data) {
            data.then((result) => {
                console.log('result===================== ', result);
                if (result) {
                    res.status(200).json({
                        hardwareDetailsData: {
                            content: result
                        },
                    });
                }
            });
        } else {
            res.status(500).json({
                hardwareDetailsData: {
                    content: 'Error While Getting SystemHardware Details'
                },
            });
        }
    }

    executeCommands(req, res, next) {
        console.log('ApplicationRouting|executeCommands');
        const data = commands.executeCommands(req.params.commands);
        console.log('datas===================== ', data);
        if (data) {
            data.then((result) => {
                console.log('result===================== ', result);
                if (result) {
                    res.status(200).json({
                        commandOuput: {
                            content: result
                        },
                    });
                }
            });
        } else {
            res.status(500).json({
                hardwareDetailsData: {
                    content: 'Error While Executing Commands'
                },
            });
        }
    }

}

module.exports = ApplicationRouting;