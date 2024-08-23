interface Message {
    key: string;
    value: string;
}

const MessageValues: Message[] = [
    {key: 'code must be unique', value: 'Code has already exist'},
    {key: 'name must be unique', value: 'Name has already exist'},
    {key: 'Project name must contain only letters, numbers, and spaces', value: 'Project name must contain only letters, numbers, and spaces'},
];

export default MessageValues;