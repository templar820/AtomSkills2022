import React from 'react';
import {
  Dialog, DialogContent, Button, CardHeader, DialogActions
} from '@mui/material';
import { SvgIcons } from 'ui-kit';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';

interface IConfirmConfig {
  title: string;
  buttonSubmitText?: string;
  buttonCancelText?: string;
  message: string;
  onClose?: () => void;
}

export default class SuccessWindow extends BaseNotification implements BaseNotificationWindow {
  private title: string;

  private message: string;

  private buttonSubmitText?: string;

  private buttonCancelText?: string;

  private onClose: (() => void) | undefined;

  open(config: IConfirmConfig) {
    this.title = config.title;
    this.message = config.message;
    this.buttonSubmitText = config.buttonSubmitText;
    this.buttonCancelText = config.buttonCancelText;
    this.onClose = config.onClose;

    this.sendNotify();
  }

  getMessage(): React.ReactNode {
    return <p>{this.message}</p>;
  }

  getIcon(): React.ReactNode {}

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog open minWidth={376} maxWidth="lg" aria-labelledby="confirmDialog">
        <DialogContent className="dialogContent">
          <CardHeader avatar={<SvgIcons name="success" width={60} />} subheader={this.title} />
          <p className="contentBody">{this.message}</p>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              this.close();
              this.onClose && this.onClose();
            }}
          >
            {this.buttonCancelText || 'Закрыть'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
