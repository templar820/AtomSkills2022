import React, { useState } from 'react';
import {
  MoreVertIcon, PopupMenuGroup, SvgIcons
} from 'ui-kit';
import { useTranslation } from 'react-i18next';
import {
  CardContent, CardHeader, Menu, MenuItem, Typography,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import Colors from '@colors';

const useStyles = makeStyles({
  headerCardPadding: {
    padding: '24px 16px 8px 24px',
  },
  bodyCardPadding: {
    padding: '0px 8px 8px 24px',
  },
});

interface ProductCardProps {
  title: string;
  subtitle1:string;
  subtitle2:string;
  isKebab?: boolean
  onEdit: () => void;
  onClick?: () => void;
}

function ProductCard(props: ProductCardProps) {
  const { t } = useTranslation();

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
    <div className="myCard cursor-pointer my-2" onClick={() => {props.onClick()}}>
      <div
        className="h-100 d-flex justify-content-between flex-column"
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
              {props.title}
            </Typography>
          )}
          action={props.isKebab && <MoreVertIcon className="subMenuIco" width onClick={handleOpenSettingsMenu} />}
        />
        <CardContent
          className="flex-grow-1 flex-shrink-1"
          classes={{
            root: classes.bodyCardPadding,
          }}
        >
          <div className="d-flex flex-row h-100 justify-content-between align-items-end">
            <div className="d-flex w-75 h-100 flex-column justify-content-between">
              <Typography variant="body2" color="textSecondary" component="p">
                {props.subtitle1}
              </Typography>
              <Typography variant="h5" style={{color: Colors.textPurple}} component="p">
                {props.subtitle2}
              </Typography>
            </div>
            <SvgIcons name="card-pattern" className="cardPattern" />
          </div>
          {props.isKebab && <Menu
            id="simple-menu"
            keepMounted={false}
            open={Boolean(anchorEl)}
            onClose={handleCloseSettingsMenu}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
          >
            <PopupMenuGroup>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  props.onEdit();
                  handleCloseSettingsMenu(e);
                }}
              >
                Редактировать
              </MenuItem>
            </PopupMenuGroup>
            <MenuItem
              className="deleteProjectMenuLink"
              onClick={(e) => {
                e.stopPropagation();
        
                handleCloseSettingsMenu(e);
              }}
            >
              Удалить
            </MenuItem>
          </Menu>}
        </CardContent>
      </div>
    </div>
  );
}

export default ProductCard;
