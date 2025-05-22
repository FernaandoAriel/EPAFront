import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, MapPin, Phone, Calendar, CreditCard, Shield, Building } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Employee/Employees.css'; 

const Employee = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: null,
    correoElectronico: '',
    direccion: '',
    contrasena: '',
    fechaContratacion: null,
    telefono: '',
    dui: '',
    numeroISS: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showISS, setShowISS] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateDUI = (dui) => {
    const re = /^\d{8}-\d$/;
    return re.test(dui);
  };

  const validatePhone = (phone) => {
    const re = /^\d{4}-\d{4}$/;
    return re.test(phone);
  };

  const validateISS = (iss) => {
    const re = /^\d{9}$/;
    return re.test(iss);
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 18;
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    // Fecha de Nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else if (!validateAge(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debe ser mayor de 18 años';
    }

    // Correo Electrónico
    if (!formData.correoElectronico) {
      newErrors.correoElectronico = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.correoElectronico)) {
      newErrors.correoElectronico = 'Formato de correo inválido';
    }

    // Dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.length < 10) {
      newErrors.direccion = 'La dirección debe ser más específica';
    }

    // Contraseña
    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es requerida';
    } else if (formData.contrasena.length < 8) {
      newErrors.contrasena = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.contrasena)) {
      newErrors.contrasena = 'Debe contener mayúscula, minúscula y número';
    }

    // Fecha de Contratación
    if (!formData.fechaContratacion) {
      newErrors.fechaContratacion = 'La fecha de contratación es requerida';
    }

    // Teléfono
    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'Formato: 0000-0000';
    }

    // DUI
    if (!formData.dui) {
      newErrors.dui = 'El DUI es requerido';
    } else if (!validateDUI(formData.dui)) {
      newErrors.dui = 'Formato: 00000000-0';
    }

    // Número de ISSS
    if (!formData.numeroISS) {
      newErrors.numeroISS = 'El número de ISSS es requerido';
    } else if (!validateISS(formData.numeroISS)) {
      newErrors.numeroISS = 'Debe contener exactamente 9 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('¡Formulario enviado correctamente!');
      console.log('Datos del empleado:', formData);
    }
  };

  const formatDUI = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers;
    }
    return `${numbers.slice(0, 8)}-${numbers.slice(8, 9)}`;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    }
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  const handleDUIChange = (e) => {
    const formatted = formatDUI(e.target.value);
    setFormData(prev => ({ ...prev, dui: formatted }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, telefono: formatted }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: date
    }));

    // Limpiar error cuando el usuario seleccione una fecha
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">
              <Building className="title-icon" />
              Registro de Empleados
            </h1>
            <p className="form-subtitle">
              Complete todos los campos para registrar un nuevo empleado
            </p>
          </div>

          {/* Form */}
          <div className="form-content">
            <div className="form-grid">
              {/* Nombre */}
              <div className="form-group">
                <label className="form-label">
                  <User className="label-icon" />
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`form-input ${errors.nombre ? 'error' : ''}`}
                  placeholder="Ingrese el nombre"
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>

              {/* Apellido */}
              <div className="form-group">
                <label className="form-label">
                  <User className="label-icon" />
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className={`form-input ${errors.apellido ? 'error' : ''}`}
                  placeholder="Ingrese el apellido"
                />
                {errors.apellido && <span className="error-message">{errors.apellido}</span>}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="label-icon" />
                  Fecha de Nacimiento
                </label>
                <DatePicker
                  selected={formData.fechaNacimiento}
                  onChange={(date) => handleDateChange(date, 'fechaNacimiento')}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccione fecha de nacimiento"
                  className={`form-input ${errors.fechaNacimiento ? 'error' : ''}`}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  yearDropdownItemNumber={80}
                  scrollableYearDropdown
                />
                {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento}</span>}
              </div>

              {/* Correo Electrónico */}
              <div className="form-group">
                <label className="form-label">
                  <Mail className="label-icon" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="correoElectronico"
                  value={formData.correoElectronico}
                  onChange={handleInputChange}
                  className={`form-input ${errors.correoElectronico ? 'error' : ''}`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.correoElectronico && <span className="error-message">{errors.correoElectronico}</span>}
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label className="form-label">
                  <Phone className="label-icon" />
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  className={`form-input ${errors.telefono ? 'error' : ''}`}
                  placeholder="0000-0000"
                  maxLength="9"
                />
                {errors.telefono && <span className="error-message">{errors.telefono}</span>}
              </div>

              {/* DUI */}
              <div className="form-group">
                <label className="form-label">
                  <CreditCard className="label-icon" />
                  DUI
                </label>
                <input
                  type="text"
                  name="dui"
                  value={formData.dui}
                  onChange={handleDUIChange}
                  className={`form-input ${errors.dui ? 'error' : ''}`}
                  placeholder="00000000-0"
                  maxLength="10"
                />
                {errors.dui && <span className="error-message">{errors.dui}</span>}
              </div>

              {/* Dirección - Ancho completo */}
              <div className="form-group full-width">
                <label className="form-label">
                  <MapPin className="label-icon" />
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className={`form-input ${errors.direccion ? 'error' : ''}`}
                  placeholder="Ingrese la dirección completa"
                />
                {errors.direccion && <span className="error-message">{errors.direccion}</span>}
              </div>

              {/* Contraseña */}
              <div className="form-group">
                <label className="form-label">
                  <Shield className="label-icon" />
                  Contraseña
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    className={`form-input password-input ${errors.contrasena ? 'error' : ''}`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>
                {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
              </div>

              {/* Fecha de Contratación */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="label-icon" />
                  Fecha de Contratación
                </label>
                <DatePicker
                  selected={formData.fechaContratacion}
                  onChange={(date) => handleDateChange(date, 'fechaContratacion')}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccione fecha de contratación"
                  className={`form-input ${errors.fechaContratacion ? 'error' : ''}`}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  minDate={formData.fechaNacimiento}
                />
                {errors.fechaContratacion && <span className="error-message">{errors.fechaContratacion}</span>}
              </div>

              {/* Número de ISSS */}
              <div className="form-group">
                <label className="form-label">
                  <Shield className="label-icon" />
                  Número de ISSS
                </label>
                <div className="password-container">
                  <input
                    type={showISS ? "text" : "password"}
                    name="numeroISS"
                    value={formData.numeroISS}
                    onChange={handleInputChange}
                    className={`form-input password-input ${errors.numeroISS ? 'error' : ''}`}
                    placeholder="9 dígitos"
                    maxLength="9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowISS(!showISS)}
                    className="password-toggle"
                  >
                    {showISS ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>
                {errors.numeroISS && <span className="error-message">{errors.numeroISS}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button"
              >
                <Building className="button-icon" />
                Registrar Empleado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;