import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { addNewEmployee, getAllEmployees } from '../api/authService';
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
    getAllEmployees().then(res => setEmployees(res.data));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    addNewEmployee(newEmployeeName).then(res => console.log(res));
  };
  return (
    <Box {...rest} textAlign="center">
      <Flex mb={10} align="center" justify="center">
        <form onSubmit={e => onSubmit(e)}>
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
        </form>
      </Flex>
      {employees.length === 0 && (
        <Box textAlign="center">
          <Text>There are no existing employees</Text>
        </Box>
      )}
      {employees?.map(employee => (
        <Box key={employee.id} my={18}>
          <Flex>
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
          </Flex>
          <EmployeeState id={employee.id} currentState={employee.state} />
        </Box>
      ))}
    </Box>
  );
}
