pragma Solidity ^0.4.13;

contract Proof {
  struct FileDetails {
    uint timestamp;
    string owner;
  }

  mapping (string => FileDetails) files;

  event logFileAddedStatus(bool status, uint timestamp, string owner, string filehash);

  //this is used to store the owner of file at the block timestamp
  function set(string owner, string filehash) {
    //There is no proper way to check if a key already exists or not therefore
    // we are checking for default value i.e., all bits are 0
    if(files[filehash].timestamp == 0) {
      files[filehash] = FileDetails(block.timestamp, owner);

      // raise the event so that everyone knows about this new record
      logFileAddedStatus(true, block.timestamp, owner, filehash);
    }
    else {
      // status false because ownership for the specific file already exist in the blockchain ledger
      logFileAddedStatus(false, block.timestamp, owner, filehash);
    }
  }

  function get(string filehash) returns (uint timestamp, string owner) {
    return (files[filehash].timestamp, files[filehash].owner);
  }
}
