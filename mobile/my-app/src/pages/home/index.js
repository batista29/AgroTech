import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import manutencao from './manutencao/index.js'
import relatorio from './relatorioManutencao/index.js'

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="manutencao" component={manutencao} />
            <Tab.Screen name="relatorio" component={relatorio} />
        </Tab.Navigator>
    );
}