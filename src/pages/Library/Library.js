import { Box, Typography } from '@mui/material';
import React from "react";
import NewBookModal from '../../components/Modals/NewBookModal/NewBookModal';
import BasicCard from '../../components/common/BasicCard/BasicCard';
import CommonButton from '../../components/common/CommonButton/CommonButton';
import GridWrapper from '../../components/common/GridWrapper/GridWrapper';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { cardHeaderStyles } from './styles';

const Library = () => {

  const [open, setOpen] = React.useState(false);

  const addBook = () => {
    setOpen(true);
  }

  const getSearchBar = () => {
    const handleChange = (value) => {
      console.log(value);
    };
    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Search for a book..."
          onChange={(event) => handleChange(event.target.value)}
        />
        <Box>
          <CommonButton
            sx={cardHeaderStyles.button}
            onClick={addBook}
          >
            Add Book
          </CommonButton>
        </Box>
      </Box>
    )
  }
  const getContent = () => (
    <Typography
      align='center'
    >
      No books yet.
    </Typography>
  )

  return (
    <>
      <GridWrapper>
        <BasicCard
          header={getSearchBar()}
          content={getContent()}
        />
        <NewBookModal
          open={open}
          onClose={() => setOpen(false)}
        />
      </GridWrapper>
    </>
  )
}

export default Library