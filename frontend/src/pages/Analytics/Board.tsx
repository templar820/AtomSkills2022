import React, {useEffect, useMemo, useState} from 'react';
import {MOBXDefaultProps} from "@globalTypes";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import Card from "@pages/Analytics/Card";
import HintPoint from "@components/ui-kit/hintPoint";
import {Badge} from "@mui/material";

const Board = (props: MOBXDefaultProps & {type: string, dateStart: string, dateEnd: string, setDialogData: any}) => {
  const [data, setData] = useState([]);
  const ticketStore = props.TicketStore;
  const filteredTickets = useMemo(() => {
    return ticketStore.ticketList.filter((t) => {
      const updateDate = new Date(t.date_time_edit_state || t.updatedAt);
      if (props.dateStart) {
        const dateStart = new Date(props.dateStart);
        if (dateStart.getTime() > updateDate.getTime()) return false;
      }
      if (props.dateEnd) {
        const dateEnd = new Date(props.dateEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);
        if (dateEnd.getTime() < updateDate.getTime()) return false;
      }
      return true;
    });
  }, [props.dateStart, props.dateEnd, ticketStore.ticketList]);
  useEffect(() => {
    const targetData = [];

    ticketStore.executors.forEach((executor) => {
      const executorTickets = filteredTickets.filter((t) => t.executor_of_claims?.id === executor.id);
      const ticketsByState = [];
      ticketStore.stateList.forEach((state) => {
        const stateTickets = executorTickets.filter(t => t.state_of_claims?.id === state.id);
        ticketsByState.push({
          stateId: state.id,
          stateName: state.caption_state,
          tickets: stateTickets,
        });
      });
      targetData.push({
        executorId: executor.id,
        executorFullName: `${executor.surname} ${executor.name}`,
        ticketsByState,
      });
    });
    setData(targetData);
  }, [ticketStore.executors, filteredTickets]);

  return (<div>
    <div className="board-row">
      <div className="board-cell"></div>
      {
        ticketStore.stateList.map(state => {
          const count = filteredTickets.reduce((acc, t) => {
            return t.state_of_claims?.id === state.id && t.id_executor ? (acc + 1) : acc;
          }, 0)
          return (<div className="board-cell">{state.caption_state} {count}</div>)
        })
      }
    </div>
    {
      data.map(executor => {
        const count = filteredTickets.reduce((acc, t) => {
          return t.executor_of_claims?.id === executor.id && t.id_executor ? (acc + 1) : acc;
        }, 0)

        return (<div className="board-row">
          <div className="board-cell">{executor.executorFullName} {count}</div>
          {
            executor.ticketsByState.map(state => {

              return (<div className="board-cell">
                {state.tickets.map(ticket => {

                  return (
                    <Card ticket={ticket} setDialogData={props.setDialogData}/>
                  )
                })}
              </div>)
            })
          }
        </div>);
      })
    }
  </div>)
};

export default MobXRouterDecorator(Board);