@echo off
echo Pushing student dashboard to GitHub...

cd /d "C:\Users\tssup\OneDrive\Desktop\last\student_dashboard"

echo Adding files to Git...
git add .

echo Committing changes...
git commit -m "Add complete student dashboard with sidebar navigation and multiple chart types

Features:
- Sidebar navigation with Dashboard, Students, Insights, Recommendations
- Multiple chart types: Pie, Bar, Line, Area charts for Student Profile
- White background with black text for better readability
- Interactive chart type selector
- TypeScript support with proper type safety
- Responsive design and modern UI components
- Backend API with Express.js
- Student data management with CSV integration"

echo Pushing to GitHub...
git push origin master

echo Done! Your project has been pushed to https://github.com/suthejats/student_analysis
pause
