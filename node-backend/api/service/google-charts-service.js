/**
 * Description: This class is used for getting the memory details and harddisk details.
 */
const promise = require('promise');
const si = require('systeminformation');
const d = require('diskinfo');

class SystemInformationDataAcess {

    constructor() {
        console.log('SystemInformationDataAcess');
        this.x;
    }

    /**
     * This static function is used to create a singleton object
     * return type of method is instance of class
     */
    static makeObject() {
        if (!this.x) {
            this.x = new SystemInformationDataAcess();
        }
        return this.x;
    }

    /**
     * This function is used to get System Hardware Data
     * return type of method is promise
     */
    getMemoryDetails() {
        console.log('SystemInformationDataAcess|getMemoryDetails ');
        try {
            return new Promise((resolve, reject) => {
                si.mem().then(result => {
                    console.log('values------------- ', result);
                    let graphData = [];
                    graphData.push(['Total', result.total]);
                    graphData.push(['Free', result.free]);
                    graphData.push(['Used', result.used]);
                    graphData.push(['Active', result.active]);
                    graphData.push(['Available:', result.available]);
                    resolve(graphData);
                });
            })
        } catch (err) {
            console.log('Error Occured in SystemInformation|getHardwareInformation ', err);
        }
    }

    /**
      * This function is used to get System Hardware Data
      * return type of method is promise
      */
    getDiskWiseMemoryDetails() {
        console.log('SystemInformationDataAcess|getDiskWiseMemoryDetails ');
        try {
            return new Promise((resolve, reject) => {
                let mainGraphData = [];
                let graphData = [];
                d.getDrives(function (err, aDrives) {
                    for (var i = 0; i < aDrives.length; i++) {
                        if (aDrives[i].filesystem != 'CD-ROM Disc') {
                            graphData = [];
                            graphData.push(['Total ', aDrives[i].blocks]);
                            graphData.push(['Used', aDrives[i].used]);
                            graphData.push(['Available', aDrives[i].available]);
                            mainGraphData.push({ 'driveData': graphData, 'mounted': aDrives[i].mounted });
                        }
                    }
                    aDrives.length = 0;
                    console.log('Final Data========== ', mainGraphData);
                    graphData = [];
                    resolve(mainGraphData);
                });
            })
        } catch (err) {
            console.log('Error Occured in SystemInformation|getDiskWiseMemoryDetails ', err);
        }
    }
}
module.exports = SystemInformationDataAcess;