import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import {
  addNewEmployee,
  deleteEmployee,
  getAllEmployees,
} from '../api/authService';
import EmployeeState from './EmployeeState';

const spanStyles = {
  as: 'span',
  fontWeight: 'bold',
  ml: 4,
};
export default function EmployeeList({ ...rest }) {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState([]);

  //on page mount load all employees
  useEffect(() => {
    if (employees.length === 0)
      getAllEmployees().then(res => setEmployees(res.data));
  }, [employees]);

  const onSubmit = e => {
    e.preventDefault();
    addNewEmployee(newEmployeeName).then(res => {
      let newEmployees = [...employees, res.data];
      setEmployees(newEmployees);
    });
  };

  const handleDeleteEmployee = (id, index) => {
    deleteEmployee(id).then(res => {
      let newEmployees = [...employees];
      if (index !== -1) {
        newEmployees.splice(index, 1);
      }
      setEmployees(newEmployees);
    });
  };

  return (
    <Box {...rest} textAlign="center">
      <form onSubmit={e => onSubmit(e)}>
        <Flex mb={10} align="center" justify="center">
          <Text>Add new employee:</Text>
          <Input
            width="200px"
            placeholder="Employee Name:"
            name="employee-name"
            ml={10}
            onChange={e => setNewEmployeeName(e.target.value)}
          />
          <Button ml={10} type="submit">
            ADD
          </Button>
        </Flex>
      </form>
      {employees.length === 0 && (
        <Box textAlign="center">
          <Text>There are no existing employees</Text>
        </Box>
      )}
      {employees?.map((employee, index) => (
        <Box key={employee.id} my={20}>
          <Flex align="center" mb={4}>
            <Text>
              ID:
              <Text {...spanStyles}>{employee.id}</Text>
            </Text>
            <Text ml={10}>
              NAME:
              <Text {...spanStyles}>{employee.name}</Text>
            </Text>
            <Text ml={10}>
              CREATED AT:
              <Text {...spanStyles}>{employee.createdAt}</Text>
            </Text>
            <Button
              ml={20}
              onClick={() => handleDeleteEmployee(employee.id, index)}
            >
              Delete this employee
            </Button>
          </Flex>
          <EmployeeState id={employee.id} currentState={employee.state} />
        </Box>
      ))}
    </Box>
  );
}
