// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
// Deployed via remix
/**
 @author Tellor Inc.
 @title SampleTellorRNG
 @dev This is a sample contract which requests and retrieves a pseudorandom number
 * from the tellor oracle. Requesting a value from tellor means sending a tip to the
 * autopay contract to incentivize reporters. After the value has been reported, there
 * is a 30 minute waiting period built into this contract to allow time for disputes.
 * Then this contract can retrieve the random number. The TellorRNG query type takes
 * a timestamp as its only input. Tellor reporters then find the next bitcoin and
 * ethereum blockhashes after that timestamp, hash them together, and then report
 * this hash as the pseudorandom number.
*/
import "usingtellor/contracts/UsingTellor.sol";
import "./interfaces/IAutopay.sol";
import "./interfaces/IERC20.sol";

contract SampleTellorRNG is UsingTellor {
    IAutopay public autopay;
    IERC20 public tellorToken;
    uint256 public tipAmount;

    /**
     * @dev Initializes parameters
     * @param _tellor address of tellor oracle contract
     * @param _autopay address of tellor autopay contract
     * @param _tellorToken address of token used for autopay tips
     * @param _tipAmount amount of token to tip
     */
    constructor(
        address payable _tellor,
        address _autopay,
        address _tellorToken,
        uint256 _tipAmount
    ) UsingTellor(_tellor) {
        autopay = IAutopay(_autopay);
        tellorToken = IERC20(_tellorToken);
        tipAmount = _tipAmount;
    }

    /**
     * @dev Request a random number by sending a tip
     * @param _timestamp input to TellorRNG query type
     */
    function requestRandomNumber(uint256 _timestamp) public {
        bytes memory _queryData = abi.encode(
            "TellorRNG",
            abi.encode(_timestamp)
        );
        bytes32 _queryId = keccak256(_queryData);
        tellorToken.approve(address(autopay), tipAmount);
        autopay.tip(_queryId, tipAmount, _queryData);
    }
}
