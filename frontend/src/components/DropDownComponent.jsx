import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import '../Css/component.scss'
import '../App.css'
import { profileChange } from '../services/UserService'
import Tooltip from '@material-ui/core/Tooltip';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        "width": "24%",
        height: "27%",
        "border-radius": "15px",
      }
    },
    MuiPopover: {
      paper: {
        "overflow-x": "hidden",
        "overflow-y": "hidden",
        "top": "20px",
        "left": "700px",
      }
    }
  },
  MuiIconButton: {
    root: {
      "flex": "0 0 auto",
      "color": "rgba(0, 0, 0, 0.54)",
      padding: "5px",
      "overflow": "visible",
      "font-size": "1.5rem",
      "text-align": "center",
      "transition": "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "border-radius": "50%"
    }
  }
})

class DropDownComponent extends React.Component {
  state = {
    anchorEl: null,
    imagePath: null,
    imageUrl: '',
    nameLetter: '',
    firstname:'',
    lastname:'',
    email:''
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = (event) => {
    // event.preventDefault();
    localStorage.clear();
    console.log(this.props);

    this.props.props.history.push('/')
    console.log('Logout');
  }

  onChange = (event) => {
    this.setState({ imagePath: event.target.files[0] })
    console.log('file====>', event.target.files[0])
    let token = localStorage.getItem('LoginToken')
    const formData = new FormData();
    formData.append('photos', this.state.imagePath);
    const config = {
      headers: {
        token: token,
        'content-type': 'multipart/form-data'
      }
    }
    
    profileChange(formData, config)
      .then((response) => {
        console.log('s3 API link', response.data.data);
        localStorage.setItem('imageurl',response.data.data)
        // this.setState({
        //   imageUrl: response.data.data
        // })
      }).catch((error) => {
      })
  }

  componentDidMount = () => {
    // if (localStorage.getItem('imageurl')) {
      this.setState({ imageUrl: localStorage.getItem('imageurl') })
    // }
    let letter = localStorage.getItem('firstname')
    if(localStorage.getItem('token1') !== undefined){
      console.log('First name letter', letter.charAt(0).toUpperCase())
      this.setState({ nameLetter: letter.charAt(0).toUpperCase(),
        firstname:localStorage.getItem('firstname'),
        lastname:localStorage.getItem('lastname'),
        email:localStorage.getItem('email')
      })
    }
  }

  render() {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <MuiThemeProvider theme={theme}>
        <div className="Menu-size">
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
          >

            <div className="profile-menu">
              <div className="circlecanvas">
                <input id="selector-file" accept="image/*" style={{ display: "none" }}
                  type="file" name="photos" onChange={this.onChange} />
                <label htmlFor="selector-file" className="image-selector" >
                  <div className="Icon-button">
                    {/* <IconButton > */}
                    <img src={this.state.imageUrl} alt={this.state.nameLetter} className="avatar" />
                    {/* </IconButton> */}
                  </div>
                </label>

                <div className="overlay">Change</div>
              </div>
              <div className="profile-name">
                <span>{this.state.firstname} {this.state.lastname}</span>
                <span>{this.state.email}</span>
              </div>
            </div>

            <Divider />

            <button className="button-signout" onClick={this.handleLogout}>Sign out</button>
          </Menu>
        </div>
      </MuiThemeProvider>
    );

    return (
      <div>
        <Tooltip title="email">
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
          >
            <div className="circleIcon">
              <div className="profile-name">
                <span>{this.state.nameLetter}</span>
              </div>
            </div>
          </IconButton>
        </Tooltip>
        {renderMenu}
      </div>
    );
  }
}

export default DropDownComponent;