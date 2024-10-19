// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access {
    address user; 
    bool access; // true or false
  }
  
  mapping(address => string[]) value;
  mapping(address => mapping(address => bool)) ownership;
  mapping(address => Access[]) accessList;
  mapping(address => mapping(address => bool)) previousData;
  mapping(address => Access[]) myAccessList; // New mapping to store accounts that gave access to the current user
  
  function add(address _user, string memory url, string memory filename) external {
    value[_user].push(url);
    value[_user].push(filename);
  }

  function allow(address user) external {
    ownership[msg.sender][user] = true; 
    if (previousData[msg.sender][user]) {
      for (uint i = 0; i < accessList[msg.sender].length; i++) {
        if (accessList[msg.sender][i].user == user) {
          accessList[msg.sender][i].access = true; 
        }
      }
    } else {
      accessList[msg.sender].push(Access(user, true));  
      previousData[msg.sender][user] = true;  
    }
    myAccessList[user].push(Access(msg.sender, true)); // Add to my access list
  }
  
  function disallow(address user) public {
    ownership[msg.sender][user] = false;
    for (uint i = 0; i < accessList[msg.sender].length; i++) {
      if (accessList[msg.sender][i].user == user) { 
        accessList[msg.sender][i].access = false;  
      }
    }
    // Remove from my access list
    for (uint j = 0; j < myAccessList[user].length; j++) {
      if (myAccessList[user][j].user == msg.sender) {
        delete myAccessList[user][j];
        break;
      }
    }
  }

  function display(address _user) external view returns (string[] memory) {
    require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
    return value[_user];
  }

  function shareAccess() public view returns (Access[] memory) {
    return accessList[msg.sender];
  }

  function getMyAccess() external view returns (Access[] memory) {
    return myAccessList[msg.sender];
  }
}
