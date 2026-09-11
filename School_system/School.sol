//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Admin

contract AdminControl {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }
}

contract ABC is AdminControl{
    struct Student{
        string name;
        uint256 age;
        string academicLevel;
        bool exists;
    }

    mapping(string => mapping(uint256 => Student)) public students;

    mapping(string => uint256[]) private studentIdsBySchool;

    event StudentAdded(string indexed originSchool, uint256 id, string name);

    function addStudent(
        string calldata _originSchool,
        uint256 _id,
        string calldata _name,
        uint256 _age,
        string calldata _academicLevel
    ) public onlyAdmin {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_age > 0, "Age must be greater than zero");
        require(bytes(_academicLevel).length > 0, "Academic level cannot be empty");

        students[_originSchool][_id] = Student({
            name: _name,
            age: _age,
            academicLevel: _academicLevel,
            exists: true
        });

        studentIdsBySchool[_originSchool].push(_id);
        emit StudentAdded(_originSchool, _id, _name);
    }
    }

    function getStudent(string calldata _originSchool, uint256 _id) public view returns (Student memory) {
        return students[_originSchool][_id];
    }

