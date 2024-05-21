import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ConstructionIcon from '@mui/icons-material/Construction';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Person4Icon from '@mui/icons-material/Person4';

export const mainNavbarItems = [
  {
    id: 0,
    icon: < HomeIcon />,
    label: 'Home',
    route: '/',
  },
  {
    id: 1,
    icon: < NewspaperIcon />,
    label: 'Blog',
    route: 'blog',
  },
  {
    id: 2,
    icon: < ConstructionIcon />,
    label: 'Projects',
    route: 'projects',
  },
  {
    id: 3,
    icon: < Person4Icon />,
    label: 'About',
    route: 'about',
  },
  {
    id: 4,
    icon: < AutoStoriesIcon />,
    label: 'Library',
    route: 'library',
  },
  {
    id: 5,
    icon: < EmojiEventsIcon />,
    label: 'Goals',
    route: 'goals',
  }
]