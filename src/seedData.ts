// import
import { Config } from "./modules/common/Config";

// Create with the arguments and read from file
const config = Config.createWithArgument();

export class GenerateSeedData  {
    /**
     * Function to generate a new genesis_timestamp which goes one day back for each transaction.
     * if no tx then date remains same at the last tx's date,
     * for a new tx the date goes 1 day back.
     */
    public changeGenesisTimeStamp(txExist : number) {
        var gdate = 0;
        if( config.seedData.seed === true ) {
            // first block and tx not exits.
            if( config.seedData.iterator === 1 &&  txExist === 0) {
               gdate=Math.floor(new Date().getTime() / 1000);
               config.seedData.iterator = 1;
            } // first block and tx exits.
            else if( config.seedData.iterator === 1 &&  txExist !== 0) {
                 // The first transaction stored will use the today's date.
                gdate=Math.floor(new Date().getTime() / 1000);
                config.seedData.iterator = 2;
            }
            else{
                /* To go back each day from today's date, the genesis_timestamp should have 
                   have a margin of 8 months*/
                gdate = config.seedData.genesis_timestamp;
                // Minus 1 day for the next transaction.
                if( txExist !== 0 ) {
                    config.seedData.genesis_timestamp = config.seedData.genesis_timestamp- 86400;
                }
            }
        }
        return gdate;
    }
}