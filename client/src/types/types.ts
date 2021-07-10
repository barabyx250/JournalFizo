export enum RequestType {
	MESSAGE = 'message',
	FIND = 'find',
	FINDaCCtEXT = 'findAccText',
	DELETE = 'delete',
	UPDATE = 'update',
	ERROR = ' error',
	SAVE = 'saved',
	UPDATE_ACC = 'upACc',
}

export enum ResponseCode {
	RES_CODE_SUCCESS = 200,
	RES_CODE_INTERNAL_ERROR = 1,
}

export class ResponseMessage<T> {
	constructor(messageInfo: string, requestCode: ResponseCode, data: T) {
		this.data = data;
		this.messageInfo = messageInfo;
		this.requestCode = requestCode;
	}
	messageInfo: string;
	requestCode: ResponseCode;
	data: T;
}

export class RequestMessage<T> {
	constructor(session: string, requestType: RequestType, data: T) {
		this.data = data;
		this.session = session;
		this.requestType = requestType;
	}
	session: string;
	requestType: RequestType;
	data: T;
}