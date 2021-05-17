pragma solidity ^0.5.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool isComplete;
    }

    event TaskCreated(uint256 id, string content);

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Try to create more tasks!");
    }

    function createTask(string memory _content) public {
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content);
        taskCount++;
    }
}
