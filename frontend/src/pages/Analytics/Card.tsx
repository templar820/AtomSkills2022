import {CardHeader, Typography, CardContent, IconButton, MenuItem, Menu} from "@mui/material";
import {MoreVertIcon, PopupMenuGroup, SvgIcons} from "ui-kit";
import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import Colors from '@colors';
import {MOBXDefaultProps} from "@globalTypes";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";

const useStyles = makeStyles({
  headerCardPadding: {
    padding: '12px 8px 8px 12px !important',
  },
  bodyCardPadding: {
    padding: '0px 4px 12px 12px !important',
  },
});


const Card = (props: MOBXDefaultProps & {ticket: any}) => {
  const {ticket} = props;
  const boxRef = React.useRef(null);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleOpenSettingsMenu = (e) => {
    e.stopPropagation();

    if (e.currentTarget) setAnchorEl(e.currentTarget);
  };

  const handleCloseSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    boxRef.current.classList.remove('selected');
    setAnchorEl(null);
  };

  return (
    <div className="myCard mb-3">
      <div
        className="d-flex justify-content-between flex-column"
        onMouseEnter={() => {
          boxRef.current.classList.add('selected');
        }}
        onMouseLeave={() => {
          boxRef.current.classList.remove('selected');
        }}
        ref={boxRef}
      >
        <CardHeader
          classes={{
            root: classes.headerCardPadding,
          }}
          className="topPanel"
          title={(
            <Typography variant="subtitle1" color="textPrimary" component="p">
              {`Заявка ${ticket.id}`}
            </Typography>
          )}
          action={<IconButton onClick={handleOpenSettingsMenu}><MoreVertIcon className="subMenuIco" width/></IconButton>}
        />
        <CardContent
          className="flex-grow-1 flex-shrink-1"
          classes={{
            root: classes.bodyCardPadding,
          }}
        >
          <div className="d-flex flex-row h-100 justify-content-between align-items-end">
            <div className="d-flex h-100 flex-column justify-content-between">
              <Typography variant="body2" style={{color: Colors.textPurple}} component="p">
                {ticket.text}
              </Typography>
            </div>
          </div>
          <Menu
            id="simple-menu"
            keepMounted={false}
            open={Boolean(anchorEl)}
            onClose={handleCloseSettingsMenu}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                props.setDialogData({ticket});
                handleCloseSettingsMenu(e);
              }}
            >
              Назначить исполнителя
            </MenuItem>
          </Menu>
        </CardContent>
      </div>
    </div>);
};

export default MobXRouterDecorator(Card);