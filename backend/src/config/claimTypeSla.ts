export const CLAIM_TYPE_SLA = [
    {
        claimTypeId: 1,
        slaPriority: [{priority: 'critical', sla: 'response_time_240'}, {priority: 'normal', sla: 'response_time_480'}, {priority: 'lower', sla: 'response_time_960'}]
    },
    {
        claimTypeId: 2,
        slaPriority: [{priority: 'critical', sla: 'response_time_120'}, {priority: 'normal', sla: 'response_time_240'}, {priority: 'lower', sla: 'response_time_480'}]
    },
    {
        claimTypeId: 3,
        slaPriority: [{priority: 'critical', sla: 'response_time_240'}, {priority: 'normal', sla: 'response_time_960'}, {priority: 'lower', sla: 'response_time_1920'}]
    },
    {
        claimTypeId: 4,
        slaPriority: [{priority: 'critical', sla: 'response_time_480'}, {priority: 'normal', sla: 'response_time_2400'}, {priority: 'lower', sla: 'response_time_4800'}]
    },
    {
        claimTypeId: 5,
        slaPriority: [{priority: 'critical', sla: 'response_time_480'}, {priority: 'normal', sla: 'response_time_960'}, {priority: 'lower', sla: 'response_time_2400'}]
    }
]