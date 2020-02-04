# Dynamic Team Generator

This is is a command-line application that dynamically generates an HTML file based on user input.  


## Instructions
- Download/Clone the repo
- Navigate to the local folder that contains the repo via the command line in Bash/Terminal
- Alternatively you can open the code in your text/code editor and then open the index.js file in the terminal
- Make sure to run "npm i" to install the required dependencies
  - If the dependencies do not automatically install you can install them individually - the required dependencies are as follows: fs, inquirer, util and jest (for testing the files in lib against the files in test)
- After the required dependencies are installed type "npm test" in the command line in order to verify that all tests pass
- Once the test have run and passed type "node app.js" in the command line and follow the prompts
- You will be prompted to select an employee's title, using the arrow keys navigate to the desired title (Manager, Engineer, Intern) and select the title by hitting "Enter/Return" on the keyboard
- Follow the remaining prompts
  - Note that two employees must not share an ID, emails must be in a valid email format and office numbers must be numbers in a numeral format 
- When finished adding employees select "No" when asked if you would like to continue
- An index.html file will be created in the output folder
- Open the index.html file in your browser to view your team roster.


## Screenshot of final output
![output-Team Generator](https://user-images.githubusercontent.com/54122844/73701527-13916580-46a7-11ea-85c5-c862d3282abf.png)

## Gif
![team-generator](https://user-images.githubusercontent.com/54122844/73701491-fbb9e180-46a6-11ea-9425-12ac037588d1.gif)


## Built With

* Node.js
* HTML
* CSS
* JavaScript
* fontAwesome
* Bulma


## Credits

* [nodejs.org] (https://nodejs.org/) - used for assistance with node, particularly with async functions
* [w3schools] (https://www.w3schools.com/nodejs) - used for assistance with node


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


