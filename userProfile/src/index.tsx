import './style.css';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';
import FormComponent from './components/FormComponent';

ReactDom.render(<FormComponent />, document.getElementById('main'));
