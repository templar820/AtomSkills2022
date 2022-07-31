import React, {useEffect, useState} from 'react';
import {MOBXDefaultProps} from "@globalTypes";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography,} from "@mui/material";
import {MuiLink, PopupMenu, PopupMenuItem, SvgIcons, Tooltip} from "ui-kit";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import csvDownload from 'json-to-csv-export';
import moment from 'moment';
import Document from './pdf';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const Documents = (props: MOBXDefaultProps) => {
  const [period, setPeriod] = useState('week');
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [printData, setPrintData] = useState(null);

  const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const generateData = () => {
    let targetStartDate, targetEndDate;
    switch (period) {
      case 'week': {
        targetStartDate = moment().clone().startOf('isoWeek').format();
        break;
      }
      case 'month': {
        targetStartDate = moment().clone().startOf('month').format();
        break;
      }
      case 'quarter': {
        targetStartDate = moment().clone().startOf('quarter').format();
        break;
      }
      case 'custom': {
        // if (!dateStart & !dateEnd) {
        //
        // }
        targetStartDate = dateStart;
        targetEndDate = dateEnd;
        break;
      }
    }
    const filteredTickets = props.TicketStore.ticketList.filter((t) => {
      const updateDate = new Date(t.date_time_edit_state || t.updatedAt);
      if (targetStartDate) {
        const dateStart = new Date(targetStartDate);
        if (dateStart.getTime() > updateDate.getTime()) return false;
      }
      if (targetEndDate) {
        const dateEnd = new Date(targetEndDate);
        dateEnd.setDate(dateEnd.getDate() + 1);
        if (dateEnd.getTime() < updateDate.getTime()) return false;
      }
    })
    return filteredTickets.map((t) => {

      return {
        id: t.id,
        type: t.claim_type?.caption_claim,
        priority: t.priority_of_claims?.caption_priority,
        openingTime: null,
        closingTime: null,
        slaConditions: null,
        slaExecutions: null,
        author: `${t.author_of_claims?.surname} ${t.author_of_claims?.name}`,
        executor: `${t.executor_of_claims?.surname} ${t.author_of_claims?.name}`,
      };
    });
  };

  useEffect(() => {
    props.services.ticketService.getTicketList();
  }, []);

  return (<div>
    <Typography variant="h2" className="mb-5">Информация о качестве оказания услуг</Typography>
    <div className="d-flex align-items-end">
      <FormControl style={{width: '220px'}} className="me-3">
        <InputLabel id="demo-controlled-open-select-label">Период</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <MenuItem value={'week'}>Неделя</MenuItem>
          <MenuItem value={'month'}>Месяц</MenuItem>
          <MenuItem value={'quarter'}>Квартал</MenuItem>
          <MenuItem value={'custom'}>Произвольный период</MenuItem>
        </Select>
      </FormControl>
      {
        period === 'custom' && (<>
          <TextField
            type="date"
            label="Начало периода"
            value={dateStart}
            onChange={e => setDateStart(e.currentTarget.value)}
            className="me-3"
          />
          <TextField
            type="date"
            label="Конец периода"
            value={dateEnd}
            onChange={e => setDateEnd(e.currentTarget.value)}
            className="me-3"
          />
        </>)
      }
      <Tooltip title="Открыть для печати">
        <Button variant="outlined" size="small" className="me-3" onClick={() => {
          setPrintData(generateData());
        }}>
          <PrintIcon/>
        </Button>
      </Tooltip>
      <PopupMenu
        button={(<Tooltip title="Выгрузка данных">
          <Button variant="outlined" size="small">
            <DownloadIcon/>
          </Button>
        </Tooltip>)}
      >
        <PopupMenuItem onClick={() => {
          download(JSON.stringify(generateData(), null, 2), 'info.json', 'text/plain');
        }} children="Выгрузка данных в формате JSON"/>
        <PopupMenuItem onClick={() => {
          csvDownload(generateData())
        }} children="Выгрузка данных в формате CSV"/>
      </PopupMenu>
    </div>
    {
      printData && (<PDFViewer className="mt-5" showToolbar={true} width={700} height={1200}>
        <Document printData={printData}/>
      </PDFViewer>)
    }
  </div>);
};

export default MobXRouterDecorator(Documents);