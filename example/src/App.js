import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function Home() {
  return <h2>Halaman Home</h2>;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input) {
    input = input.target || input;
    this.setState({ [input.name]: input.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch("http://localhost:3000/register", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          username: "",
          password: "",
          msg: data,
        })
      );
  }

  render() {
    const { username, password, msg } = this.state;
    return (
      <div>
        <h2>Register</h2>
        Username :{" "}
        <input
          type="text"
          name="username"
          onChange={this.handleChange}
          value={username}
        />
        <br />
        Password :{" "}
        <input
          type="password"
          name="password"
          onChange={this.handleChange}
          value={password}
        />
        <br />
        <button onClick={this.handleSubmit}>Register</button>
        <br />
        {msg.error && <p>{msg.error}</p>}
        {msg.status && <p>{msg.status}</p>}
      </div>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: "",
      token: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input) {
    input = input.target || input;
    this.setState({ [input.name]: input.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch("http://localhost:3000/login", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          username: "",
          password: "",
          status: data.status,
          token: data?.token,
        })
      );
  }

  render() {
    const { username, password, status, token } = this.state;
    localStorage.setItem("token", token);
    return (
      <div>
        <h2>Login</h2>
        Username :{" "}
        <input
          type="text"
          name="username"
          onChange={this.handleChange}
          value={username}
        />
        <br />
        Password :{" "}
        <input
          type="password"
          name="password"
          onChange={this.handleChange}
          value={password}
        />
        <br />
        <button onClick={this.handleSubmit}>Login</button>
        <br />
        {status && <p>{status}</p>}
      </div>
    );
  }
}

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ dataUser: data.values, isLoading: false })
      );
  }

  render() {
    const { dataUser, isLoading } = this.state;
    if (isLoading) return <p>Loading data ...</p>;
    return (
      <div>
        <h2>List Users</h2>
        <ul>
          {dataUser.map((item, idx) => {
            const to = "user/" + item.username;
            return (
              <li key={idx}>
                <Link to={to}>{item.username}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Produk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProduct: [],
      nama_produk: "",
      msg: "",
      token: localStorage.getItem("token"),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ nama_produk: "", dataProduct: data.values })
      );
  }

  handleChange(input) {
    input = input.target || input;
    this.setState({ [input.name]: input.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { nama_produk, token } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_produk, token }),
    };
    fetch("http://localhost:3000/produk", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          nama_produk: "",
          msg: data,
        })
      );

    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => this.setState({ dataProduct: data.values }));
  }

  render() {
    const { dataProduct, nama_produk, msg } = this.state;
    return (
      <div>
        <h2>Insert Produk</h2>
        Nama Produk :{" "}
        <input
          type="text"
          name="nama_produk"
          onChange={this.handleChange}
          value={nama_produk}
        />
        <br />
        <button onClick={this.handleSubmit}>Simpan</button>
        <br />
        {msg.error && <p>{msg.error}</p>}
        {msg.status && <p>{msg.status}</p>}
        <br />
        <h2>List Produk</h2>
        <ul>
          {dataProduct.map((item, idx) => {
            return <li key={idx}>{item.nama_produk}</li>;
          })}
        </ul>
      </div>
    );
  }
}

class Pelanggan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCustomer: [],
      email: "",
      nama: "",
      alamat: "",
      msg: "",
      token: localStorage.getItem("token"),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => this.setState({ dataCustomer: data.values }));
  }

  handleChange(input) {
    input = input.target || input;
    this.setState({ [input.name]: input.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, nama, alamat, token } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nama, alamat, token }),
    };
    fetch("http://localhost:3000/pelanggan", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          email: "",
          nama: "",
          alamat: "",
          msg: data,
        })
      );

    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => this.setState({ dataCustomer: data.values }));
  }

  render() {
    const { dataCustomer, email, nama, alamat, msg } = this.state;
    return (
      <div>
        <h2>Insert Pelanggan</h2>
        Email :{" "}
        <input
          type="text"
          name="email"
          onChange={this.handleChange}
          value={email}
        />
        <br />
        Nama :{" "}
        <input
          type="text"
          name="nama"
          onChange={this.handleChange}
          value={nama}
        />
        <br />
        Alamat :{" "}
        <input
          type="textarea"
          name="alamat"
          onChange={this.handleChange}
          value={alamat}
        />
        <br />
        <button onClick={this.handleSubmit}>Simpan</button>
        <br />
        {msg.error && <p>{msg.error}</p>}
        {msg.status && <p>{msg.status}</p>}
        <br />
        <h2>List Pelanggan</h2>
        <ul>
          {dataCustomer.map((item, idx) => {
            return (
              <li key={idx}>
                {item.nama} - {item.email} - {item.alamat}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCustomer: [],
      dataProduct: [],
      dataTransaksi: [],
      email_pelanggan: "",
      produk_id: "",
      msg: "",
      token: localStorage.getItem("token"),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => this.setState({ dataCustomer: data.values }));
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ nama_produk: "", dataProduct: data.values })
      );

    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => this.setState({ dataTransaksi: data.values }));
  }

  handleChange(input) {
    input = input.target || input;
    this.setState({ [input.name]: input.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email_pelanggan, produk_id, token } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_pelanggan, produk_id, token }),
    };
    fetch("http://localhost:3000/transaksi", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ msg: data }));

    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => this.setState({ dataTransaksi: data.values }));
  }

  render() {
    const { dataCustomer, dataProduct, dataTransaksi, msg } = this.state;
    return (
      <div>
        <h2>Insert Transaksi</h2>
        Pelanggan :{" "}
        <select name="email_pelanggan" onChange={this.handleChange}>
          <option key={-1} value={""}>
            Pilih Nama Pelanggan
          </option>
          {dataCustomer.map((item, idx) => {
            return (
              <option key={idx} value={item.email}>
                {item.nama}
              </option>
            );
          })}
        </select>
        <br />
        Produk :{" "}
        <select name="produk_id" onChange={this.handleChange}>
          <option key={-1} value={""}>
            Pilih Nama Produk
          </option>
          {dataProduct.map((item, idx) => {
            return (
              <option key={idx} value={item.produk_id}>
                {item.nama_produk}
              </option>
            );
          })}
        </select>
        <br />
        <button onClick={this.handleSubmit}>Simpan</button>
        <br />
        {msg.error && <p>{msg.error}</p>}
        {msg.status && <p>{msg.status}</p>}
        <br />
        <h2>List Transaksi</h2>
        <ul>
          {dataTransaksi.map((item, idx) => {
            return (
              <li key={idx}>
                Pelanggan : {item.nama} - membeli {item.nama_produk}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function DetailUser({ match }) {
  return <h2>Ini Halaman {match.params.name}</h2>;
}

function NotFound() {
  return <h2>404 Pages Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/users"> List User </Link>
          </li>
          <li>
            <Link to="/register"> Register </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/produk"> Master Produk </Link>
          </li>
          <li>
            <Link to="/pelanggan"> Master Pelanggan </Link>
          </li>
          <li>
            <Link to="/transaksi"> Master Transaksi </Link>
          </li>
        </nav>

        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={ListUser} />
            <Route path="/user/:name" exact component={DetailUser} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />

            <Route path="/produk" exact component={Produk} />
            <Route path="/pelanggan" exact component={Pelanggan} />
            <Route path="/transaksi" exact component={Transaksi} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
