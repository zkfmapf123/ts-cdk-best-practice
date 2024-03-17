package src

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var (
	appsFolderPath = "dist/apps"
	command        = []string{"deploy", "synth", "destroy", "diff", "exit"}
)

var (
	appsTransfile  = []string{"dist/apps", "apps"}
	indexTransfile = []string{"index.js", "index.yml"}
)

var (
	rootCmd = &cobra.Command{
		Use:   "CDK-CLI",
		Short: "CDK-CLI",
		Long:  "CKD-CLI",
		Run: func(cmd *cobra.Command, args []string) {
			Clear()

			// 1. Select Task
			task := SelectBox("CDK Pipeline Start", command)

			// 2. Select Apps
			executePath, err := os.Executable()
			if err != nil {
				log.Fatalln("select app error", err)
			}

			folderList := RetrieveApps(executePath, appsFolderPath)

			// 3. Select FolderList
			app := SelectBox("Select to Apps Files", folderList)

			// 4. Read Profile
			config, err := GetYmlConfigUsePath(app, appsTransfile, indexTransfile)
			if err != nil {
				log.Fatalln("AWS Config Error", err)
			}

			// Confirm
			fullCommand := []string{"cdk", task, "--app", app, "--profile", config.Common.Profile, "--region", config.Common.Region}
			executeCmd := SelectBox(fmt.Sprintf("%s를 진행하시겠습니까? (Enter)\nCDK Task : %s\nApp : %s\nProfile : %s\nRegion : %s\nCommand : %s", task, task, app, config.Common.Profile, config.Common.Region, strings.Join(fullCommand, " ")), []string{"1 (실행)", "2 (종료)"})

			if strings.Contains(executeCmd, "1") {
				CommandStart(fullCommand)
			}
		},
	}
)

func Execute() {
	cobra.OnInitialize(func() {
		fmt.Println("Init config")
	})

	if err := rootCmd.Execute(); err != nil {
		log.Fatalln(err)
	}
}
