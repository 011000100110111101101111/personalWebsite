"""
Author: Alex Sheehan
Purpose: Translates stored markdown file names into a js file as a list of dictionaries to use in React Blog Page. Makes the file names presentable (capitalizes, removes underscores)
"""


import os
import re
from datetime import datetime

import markdown


def list_markdown_files(directory):
    """Lists all markdown (*.md) files in the given directory."""
    files = os.listdir(directory)
    return [file for file in files if file.endswith('.md')]


def write_out(sorted_filenames, directory_path, variable_name, out_file):
  id = 1
  starter_line = f"export const {variable_name} = ["
  starter_line += '\n'
  for fileName in sorted_filenames:
    with open(directory_path + "/" + fileName, "r") as input_file:
      text = input_file.read()
    md = markdown.Markdown(extensions=['meta'])
    md.convert(text)
    # md.Meta['layout']
    # date=fileName[0:10]
    # title = re.split('[.]', fileName[11:])[0]
    # title = re.sub('[_]', " ", title)
    title = md.Meta['title'][0]
    date = md.Meta['date'][0]
    background = md.Meta['image'][0]
    # title = title.title()
    starter_line += "  {"
    starter_line += f"\n\t\tid: {id},"
    starter_line += f"\n\t\ttitle: '{title}',"
    starter_line += f"\n\t\tfullTitle: '{fileName}',"
    starter_line += f"\n\t\tdate: '{date}',"
    starter_line += f"\n\t\tbackground: '{background}',\n"
    starter_line += "  },\n"
    id = id + 1
  starter_line += f'\n]'
  # print(f"Variables: {sorted_filenames} {directory_path} {variable_name} {out_file}")
  file = open(out_file, 'w')
  file.write(starter_line)
  file.close()



def main():
  directory_path = './public/posts'
  markdown_files = list_markdown_files(directory_path)
  # Sort the filenames based on the extracted date
  sorted_filenames = sorted(markdown_files, reverse=True)
  most_recent_three = sorted_filenames[:3]
  write_out(sorted_filenames, directory_path, "postNames", "src/blog/posts.js")
  write_out(most_recent_three, directory_path, "recentPosts", "src/blog/recentPosts.js")


main()