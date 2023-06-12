package com.app.Exceptions;

public class ResourceNotFoundException extends RuntimeException{
public ResourceNotFoundException (String mesg) {
	super(mesg);
}
}
