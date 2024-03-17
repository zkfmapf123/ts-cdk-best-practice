package src

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v3"
)

type AWSConfig struct {
	Common struct {
		ProjectName  string `yaml:"projectName"`
		ResourceName string `yaml:"resourceName"`
		Profile      string `yaml:"profile"`
		Region       string `yaml:"region"`
	} `yaml:"common"`
}

func RetrieveApps(path, appsFolderPath string) []string {

	appPath := filepath.Join(cleanFolderPath(path), appsFolderPath)
	return getAppsPathUseRecur(appPath, []string{})
}

func GetYmlConfigUsePath(path string, appTrans []string, filesTrans []string) (AWSConfig, error) {
	var config AWSConfig

	exYmlPath := strings.Replace(path, appTrans[0], appTrans[1], 1)
	ymlPath := strings.Replace(exYmlPath, filesTrans[0], filesTrans[1], 1)

	ymlFile, err := os.ReadFile(ymlPath)
	if err != nil {
		return AWSConfig{}, err
	}

	err = yaml.Unmarshal(ymlFile, &config)
	if err != nil {
		return AWSConfig{}, err
	}

	return config, nil
}

func getAppsPathUseRecur(path string, apps []string) []string {

	dirs, err := os.ReadDir(path)
	if err != nil || len(dirs) == 0 {
		return apps
	}

	// chekc to index.js file
	filePath := filepath.Join(path, "index.js")
	_, err = os.Stat(filePath)

	// Exist
	if err == nil {
		apps = append(apps, filePath)
	}

	for _, dir := range dirs {
		if dir.IsDir() {
			dirPath := fmt.Sprintf("%s/%s", path, dir.Name())
			apps = getAppsPathUseRecur(dirPath, apps)
		}
	}

	return apps
}

func cleanFolderPath(path string) string {
	ex := filepath.Dir(path)
	return filepath.Clean(ex)
}
