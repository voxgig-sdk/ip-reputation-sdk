package core

type IpReputationError struct {
	IsIpReputationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpReputationError(code string, msg string, ctx *Context) *IpReputationError {
	return &IpReputationError{
		IsIpReputationError: true,
		Sdk:              "IpReputation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpReputationError) Error() string {
	return e.Msg
}
