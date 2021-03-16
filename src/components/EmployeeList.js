import { Box, Flex, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { getAllEmployees } from '../api/authService';
import EmployeeState from './EmployeeState';

const spanStyles = {
  as: 'span',
  fontWeight: 'bold',
  ml: 4,
};
export default function EmployeeList({ ...rest }) {
  const [employees, setEmployees] = useState([]);

  //on page mount load all employees
  useEffect(() => {
    getAllEmployees().then(res => setEmployees(res.data));
  }, []);

  return (
    <Box {...rest}>
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
