import React from 'react';
import {render} from 'react-dom';
import SampleComponent from './components/SampleComponent';

import './sass/site.scss';

render(<SampleComponent/>, document.getElementById('sampleComponent'));
