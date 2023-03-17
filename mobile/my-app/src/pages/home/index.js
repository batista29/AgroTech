import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import manutencao from './manutencao/index.js'
import relatorio from './disponiveis/index.js'
import indisponiveis from './ocupados/index'

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="manutencao" component={manutencao} />
            <Tab.Screen name="Disponiveis" component={relatorio} />
            <Tab.Screen name="Indisponiveis" component={indisponiveis} />
        </Tab.Navigator>
    );
}