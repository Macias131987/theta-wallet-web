import _ from 'lodash';
import {getMetachainInfoForChainId} from '@thetalabs/theta-js/src/networks';

export const getMetachainConfig = (mainChainIdStr) => {
    if(_.startsWith(mainChainIdStr, 'tsub')){
        return null;
    }

    return getMetachainInfoForChainId(mainChainIdStr);
}

export const getCrossTransferFee = (mainChainIdStr, subchainIDStr) => {
    const config = getMetachainConfig(mainChainIdStr);
    if(_.isNil(subchainIDStr) || !_.startsWith(subchainIDStr, 'tsub')){
        return config?.crossChainTransferFeeInTFuel;
    }
    const subchain = getSubchain(mainChainIdStr, subchainIDStr);
    if(subchain){
        return subchain.crossChainTransferFeeInTFuel;
    }

    // Default to 10
    return 10;
}

export const getSubchains = (mainChainIdStr) => {
    let config = getMetachainConfig(mainChainIdStr);

    return config?.subchains || [];
}

export const getSubchain = (mainChainIdStr, subchainIDStr) => {
    let chains = getSubchains(mainChainIdStr);

    return _.find(chains, (chain) => {
        return (chain.subchainIDStr === subchainIDStr);
    });
}
