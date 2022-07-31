import React, {useEffect, useState} from 'react';
import {MOBXDefaultProps} from "@globalTypes";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import Card from "@pages/Analytics/Card";

const Board = (props: MOBXDefaultProps & {type: string, dateStart: string, dateEnd: string, setDialogData: any}) => {
  const [data, setData] = useState([]);
  const ticketStore = props.TicketStore;
  useEffect(() => {
    const targetData = [];
    const filteredTickets = ticketStore.ticketList.filter((t) => {
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
  }, [ticketStore.executors, ticketStore.ticketList, props.dateStart, props.dateEnd]);

  return (<div>
    <div className="board-row">
      <div className="board-cell"></div>
      {
        ticketStore.stateList.map(state => (<div className="board-cell">{state.caption_state}</div>))
      }
    </div>
    {
      data.map(executor => {

        return (<div className="board-row">
          <div className="board-cell">{executor.executorFullName}</div>
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