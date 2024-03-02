import os
import json

def get_folder_paths(directory):
    folder_paths = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            folder_paths.append(os.path.join(root, file))
    return folder_paths

def createKeys(list):
    pathJson = {}
    for path in list:
        startIndex = path.find("/")
        endIndex = path.find("Tint")
        pathJson[path[startIndex+1:endIndex]]=path
        pass
    
    return pathJson

def load_json():
    pass

def write_to_file(fileName, json):
    f = open(fileName, "w")
    f.write(json)
    f.close()

animated_directory_path = 'AnimatedGradients'
animated_folder_paths = get_folder_paths(animated_directory_path)
animated_folder_json = createKeys(animated_folder_paths)

static_directory_path = 'StaticGradients'
static_folder_paths = get_folder_paths(static_directory_path)
static_folder_json = createKeys(static_folder_paths)

write_to_file("animatedGradientPaths.json", json.dumps(animated_folder_json))
write_to_file("staticGradientPaths.json", json.dumps(static_folder_json))