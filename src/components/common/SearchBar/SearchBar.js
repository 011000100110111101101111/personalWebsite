import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Input from '@mui/material/Input';
import React from 'react';
import { searchBarStyles } from './styles';

const SearchBar = ({ placeholder, onChange}) => {
  return (
    <Box sx={searchBarStyles.wrapper}>
      <SearchIcon sx={searchBarStyles.icon}/>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={searchBarStyles.input}
        fullWidth='true'
      >
      </Input>
    </Box>
  )
}

export default SearchBar