import React, { useState, useEffect } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  Table
} from 'rsuite'

import moment from 'moment'

import api from '../../services/api'

const { Column, HeaderCell, Cell } = Table
// import { Container } from './styles';
// import 'rsuite/dist/styles/rsuite-default.css'

const styleGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '335px 600px',
  padding: '30px'
}
const users: React.FC = () => {
  const [dataList, setData] = useState<any>([])

  const [stateForm, setStateForm] = useState<any>({
    email: '',
    name: ''
  })

  useEffect(() => {
    api.get('/users').then(({ data }: any) => {
      setData(data)
    })
  }, [])

  const addNewUser = (): void => {
    api
      .post('/users', {
        email: stateForm.email,
        name: stateForm.name
      })
      .then(({ data }: any) => {
        const newData = dataList.length > 0 ? [...dataList, data] : [data]
        setData(newData)
      })
  }

  return (
    <>
      <div style={styleGrid}>
        <Form>
          <h4 style={{ marginBottom: '20px' }}>Novo usuário</h4>
          <FormGroup>
            <FormControl
              name="email"
              placeholder="Email"
              onChange={val => setStateForm({ ...stateForm, email: val })}
            />
            <HelpBlock>This field is required</HelpBlock>
          </FormGroup>

          <FormGroup>
            <FormControl
              name="name"
              placeholder="Name"
              onChange={val => setStateForm({ ...stateForm, name: val })}
            />
            <HelpBlock tooltip>This field is required</HelpBlock>
          </FormGroup>

          <ButtonToolbar>
            <Button appearance="primary" onClick={addNewUser}>
              Inserir
            </Button>
          </ButtonToolbar>
        </Form>
        <div>
          <h4 style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            Lista de usuários
          </h4>
          <Table virtualized height={400} data={dataList}>
            <Column width={70} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={130}>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell>E-mail</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column width={180}>
              <HeaderCell>Criado em</HeaderCell>
              <Cell dataKey="created_at">
                {rowdata => {
                  return moment(rowdata.updated_at).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      </div>
    </>
  )
}

export default users
