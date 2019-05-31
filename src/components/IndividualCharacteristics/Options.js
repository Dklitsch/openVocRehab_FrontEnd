const SexOptions = [
    { 'label': 'Individual indicates that he is male.', 'value': 1 }, 
    { 'label': 'Individual indicates that she is female.', 'value': 2 }, 
    { 'label': 'Individual did not self-identify their sex.', 'value': 9 }
];

const AmericanIndianOrAlaskaNativeOptions = [
    { 'label': 'Individual is American Indian or Alaska Native.', 'value': 1 }, 
    { 'label': 'Individual is not American Indian or Alaska Native.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her race.', 'value': 9 }
];

const AsianOptions = [
    { 'label': 'Individual is Asian.', 'value': 1 }, 
    { 'label': 'Individual is not Asian.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her race.', 'value': 9 }
];

const BlackOrAfricanAmericanOptions = [
    { 'label': 'Individual is Black or African American.', 'value': 1 }, 
    { 'label': 'Individual is not Black or African American.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her race.', 'value': 9 }
];

const NativeHawaiianOrOtherPacificIslanderOptions = [
    { 'label': 'Individual is Native Hawaiian or Other Pacific Islander.', 'value': 1 }, 
    { 'label': 'Individual is not Native Hawaiian or Other Pacific Islander.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her race.', 'value': 9 }
];

const WhiteOptions = [
    { 'label': 'Individual is White.', 'value': 1 }, 
    { 'label': 'Individual is not White.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her race.', 'value': 9 }
];

const HispanicOptions = [
    { 'label': 'Individual is Hispanic or Latino.', 'value': 1 }, 
    { 'label': 'Individual is not Hispanic or Latino.', 'value': 0 }, 
    { 'label': 'Individual did not self-identify his/her ethnicity.', 'value': 9 }
];

const VeteranOptions = [
    { 'label': 'Individual is a Veteran.', 'value': 1 }, 
    { 'label': 'Individual is not a Veteran.', 'value': 0 }
];

const LivingArrangementOptions = [
    {'label': 'Private Residence (independent, or with family or other person)', 'value': 1}, 
    {'label': 'Community Residential Facility/Group Home', 'value': 2}, 
    {'label': 'Rehabilitation Facility', 'value': 3}, {'label': 'Mental Health Facility', 'value': 4}, {'label': 'Nursing Home', 'value': 5}, {'label': 'Correctional Facility', 'value': 6}, {'label': 'Halfway House', 'value': 7}, {'label': 'Substance Abuse Treatment Center', 'value': 8}, {'label': 'Homeless/Shelte', 'value': 9}, {'label': 'Other', 'value': 10}
];

export { 
    SexOptions, AmericanIndianOrAlaskaNativeOptions, AsianOptions,
    BlackOrAfricanAmericanOptions, NativeHawaiianOrOtherPacificIslanderOptions, WhiteOptions,
    HispanicOptions, VeteranOptions, LivingArrangementOptions
}