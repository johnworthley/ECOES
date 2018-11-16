import {
    WRITER_DISABLED,
    SET_IDENTITY,
    LOADED_NETWORKS,
    SET_NETWORK,
    READER_ENABLED,
    WRITER_ENABLED,
    UPDATE_NETWORKS,
    LOADED_ACCOUNT,
    LOAD_ACCOUNT,
    LOAD_NETWORKS,
    SET_SIGNER,
} from './constants';

export function disableWriter() {
  return {
    type: WRITER_DISABLED,
  };
}

export function setIdentity() {
  return {
    type: SET_IDENTITY,
  };
}

export function loadedNetworks(networks, defaultNetwork) {
  return {
    type: LOADED_NETWORKS,
    networks,
    defaultNetwork,
  };
}

export function setNetwork(networkSelected,override) {
  return {
    type: SET_NETWORK,
    networkSelected,
    override,
  };
}

export function enableReader(networkReader, tokens, claims) {
  return {
    type: READER_ENABLED,
    networkReader,
    tokens,
    claims,
  };
}

export function enableWriter(networkWriter, networkIdentity) {
  return {
    type: WRITER_ENABLED,
    networkWriter,
    networkIdentity,
  };
}

export function updateNetworks(networks) {
  return {
    type: UPDATE_NETWORKS,
    networks,
  };
}

export function loadedAccount(networkAccount) {
  return {
    type: LOADED_ACCOUNT,
    networkAccount,
  };
}

export function loadAccount() {
  return {
    type: LOAD_ACCOUNT,
  };
}

export function loadNetworks() {
  return {
    type: LOAD_NETWORKS,
  };
}

export function setSigner(networkSigner) {
  return {
    type: SET_SIGNER,
    networkSigner,
  };
}