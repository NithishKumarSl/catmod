import React, { useState } from 'react'
import axios from 'axios'

const ProjectName = ({onsubmit}) => {

	const [projectName, setProjectName] = useState('')
	const [error, setError] = useState('')

	async function handleSubmit(event) {
		event.preventDefault();

		try{
			await axios.post('http://localhost:5000/create-folder', {projectName});
			onsubmit(projectName);
		} catch(error){
			setError('Failed to create project. Please try again')
		}
	}

  return (
    <div className='projectName'>
			<form onSubmit={handleSubmit}>
				<label htmlFor="projectName">Enter Project Name</label>
				<input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)}required/>
				<button type='submit'>Start Project</button>
				{error && <p>{error}</p>}
			</form>
    </div>
  );
};

export default ProjectName;