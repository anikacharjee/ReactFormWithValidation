import React, {useState} from 'react';
import './App.css';

const FormExample = () => {
  //state to hold form data (username, email, password)
  const [formData, setFormData] =useState({
    username: '',
    email: '',
    password: ''
  });

  //state to hold form validation error messages
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: ''
});

const [isFormValid, setIsFormValid] = useState(false);

  //Function to handle input changes and perform basic form validation
  const handleChange = (e) => {
    const {name, value} = e.target;

    //update the formData state based on the input change
    setFormData({
      ...formData,
      [name]: value
    });
  

  //Basic form validation
  if(name === 'username') {
    //check if the username is at least 3 characters long 
    setFormErrors({
      ...formErrors,
      [name]: value.length < 3 ? 'Username must be at least 3 characters' : ''
    });
  } else if(name === 'email') {
    //check if the email is valid using a simple regular expression
    setFormErrors({
      ...formErrors,
      [name]: !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address' : ''
    });
   } else if(name === 'password') {
    //check if the password is at least 6 characters long
    setFormErrors({
      ...formErrors,
      [name]: value.length < 6 ? 'Password must be at least 6 characters' : ''
    });
   }
};

//Function to handle form submission
const handleSubmit = (e) => { 
  e.preventDefault();

  console.log('Form Submitted', formData);

  setFormData({
    username: '',
    email: '',
    password: ''
  });

};

//check if there are any errors in the form
const checkFormValidity = () => {
  const errors = Object.values(formErrors).some((error) => error !== '');
  setIsFormValid(!errors);
};

//Update the form validity whenever formErrors change
React.useEffect(() => {
  checkFormValidity();
}, [formErrors]);



//JSX structure for the component
return (
  <div>
    <h1> React Form Example</h1>
    <form onSubmit={handleSubmit} autoComplete='off' className='form-table'>
      <table>
        <tbody>
          <tr>
            <td> <label htmlFor='username'>Username: </label></td>
            <td> 
              <input type='text' id='username' name='username'
                    value={formData.username} onChange={handleChange}/>

              {formErrors.username && <p className='error'>{formErrors.username} </p>}
            </td>
          </tr>

          <tr>
            <td> <label htmlFor='email'>Email: </label></td>
            <td> 
              <input type='email' id='email' name='email'
                    value={formData.email} onChange={handleChange}/>

              {formErrors.email && <p className='error'>{formErrors.email} </p>}
            </td>
          </tr>

          <tr>
            <td> <label htmlFor='password'>Password: </label></td>
            <td> 
              <input type='password' id='password' name='password'
                    value={formData.password} onChange={handleChange}/>

              {formErrors.password && <p className='error'>{formErrors.password} </p>}
            </td>
          </tr>
        </tbody>
      </table>

      <button type='submit' disabled={!isFormValid} >Submit</button>
    </form>
  </div>
);

};

export default FormExample;


