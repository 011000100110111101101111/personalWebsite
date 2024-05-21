import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from "react";
import Navbar from '../Navbar/Navbar';
import { headerStyles } from './styles';

const Header = ({title}) => {
  return (
    <Box
      sx={headerStyles.wrapper}
    >
      <Box
        sx={headerStyles.title}
      >
        <Typography
          variant='h5'
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={headerStyles.nav}
      >
        <Navbar />
      </Box>
    </Box>
  )
}


export default Header

// const Header = ({title}) => {
//   return (
//     <Box
//       sx={headerStyles.wrapper}
//     >
//       <Box
//         sx={headerStyles.topRow}
//       >
//         <Navbar />
//         <Box
//           sx={headerStyles.notificationBar}
//         >
//           <Typography
//             sx={headerStyles.link}
//           >
//             Go to docs
//           </Typography>
//           <NotificationBell
//             iconColor='white'
//             badgeColor='error'
//             badgeContents={1}
//           />
//           <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
//         </Box>
//       </Box>
//       {/* second row */}
//       <Box
//         sx={headerStyles.middleRow}
//       >
//         <Typography
//           variant="h1"
//         >
//           {title}
//         </Typography>
//         <Box>
//           <CommonButton
//             variant="outlined"
//             sx={headerStyles.webButton}
//           >
//             Web Setup
//           </CommonButton>
//           <Tooltip
//             title="help"
//           >
//             <IconButton
//               color="white"
//               sx={headerStyles.helpIcon}
//             >
//               <HelpIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default Header