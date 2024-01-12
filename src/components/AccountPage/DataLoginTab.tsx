import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChangePassForm } from './ChangeLoginDataForm'

export default function DataLoginTab() {
  return (
    <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Zmień dane logowania</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePassForm />
          </CardContent>
        </Card>
  )
}
