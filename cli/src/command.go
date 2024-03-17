package src

import (
	"log"
	"os"
	"os/exec"

	"github.com/AlecAivazis/survey/v2"
)

func Clear() {
	cmd := exec.Command("clear")
	cmd.Stdout = os.Stdout
	cmd.Run()
}

func SelectBox(msg string, list []string) string {
	prompt := &survey.Select{
		Message: msg,
		Options: list,
	}

	var answer string

	survey.AskOne(prompt, &answer, nil)
	if answer == "exit" {
		os.Exit(0)
	}

	return answer
}

func PressEnter(msg string) string {

	newMsg := msg
	if msg == "" {
		newMsg = "Press Enter the Back"
	}

	prompt := &survey.Input{
		Message: newMsg,
	}

	var answer string
	survey.AskOne(prompt, &answer, nil)
	return answer
}

func CommandStart(execList []string) {
	// cmd := (execList[0], execList[1:]...)

	cmd := exec.Command(execList[0], execList[1:]...)

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		log.Fatalln(err)
	}
}
