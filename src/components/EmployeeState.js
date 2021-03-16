import { Box, Flex, Text } from '@chakra-ui/layout';
import { updateEmployeeState } from '../api/authService';

const boxStyles = {
  p: 20,
  border: '1px solid #EBEDF0',
  cursor: 'pointer',
  _hover: {
    bg: '#1D5AD4',
    color: 'white',
  },
};
const textStyles = {
  color: 'inherit',
};
const STATES = {
  ADDED: 'ADDED',
  IN_CHECK: 'IN-CHECK',
  APPROVED: 'APPROVED',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
export default function EmployeeState({ id, currentState }) {
  const handleStateSelect = stateName => {
    updateEmployeeState(id, stateName)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  return (
    <Flex>
      <Box
        {...boxStyles}
        bg={currentState === STATES.ADDED && '#1D5AD4'}
        color={currentState === STATES.ADDED && 'white'}
        onClick={() => handleStateSelect(STATES.ADDED)}
      >
        <Text {...textStyles}>{STATES.ADDED}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={currentState === STATES.IN_CHECK && '#1D5AD4'}
        color={currentState === STATES.IN_CHECK && 'white'}
        onClick={() => handleStateSelect(STATES.IN_CHECK)}
      >
        <Text {...textStyles}>{STATES.IN_CHECK}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={currentState === STATES.APPROVED && '#1D5AD4'}
        color={currentState === STATES.APPROVED && 'white'}
        onClick={() => handleStateSelect(STATES.APPROVED)}
      >
        <Text {...textStyles}>{STATES.APPROVED}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={currentState === STATES.ACTIVE && '#1D5AD4'}
        color={currentState === STATES.ACTIVE && 'white'}
        onClick={() => handleStateSelect(STATES.ACTIVE)}
      >
        <Text {...textStyles}>{STATES.ACTIVE}</Text>
      </Box>
      <Box
        {...boxStyles}
        bg={currentState === STATES.INACTIVE && '#1D5AD4'}
        color={currentState === STATES.INACTIVE && 'white'}
        onClick={() => handleStateSelect(STATES.INACTIVE)}
      >
        <Text {...textStyles}>{STATES.INACTIVE}</Text>
      </Box>
    </Flex>
  );
}
